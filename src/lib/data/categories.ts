import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

// ============================================================
// TYPES
// ============================================================

export interface CategoryWithCount {
  id: string;
  value: string;
  label: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  sortOrder: number;
  _count: {
    jobs: number;
    subcategories: number;
  };
}

export interface CategoryWithSubcategories extends CategoryWithCount {
  subcategories: {
    id: string;
    value: string;
    label: string;
    slug: string;
    description?: string | null;
    _count: {
      jobs: number;
    };
  }[];
  seoDescription?: string | null;
  seoTitle?: string | null;
}

export interface SubcategoryWithCategory {
  id: string;
  value: string;
  label: string;
  slug: string;
  description?: string | null;
  category: {
    id: string;
    label: string;
    slug: string;
  };
  _count: {
    jobs: number;
  };
}

export interface PopularCategory {
  id: string;
  label: string;
  slug: string;
  icon?: string | null;
  jobCount: number;
}

// ============================================================
// DATA ACCESS FUNCTIONS
// ============================================================

export async function getAllCategories(): Promise<CategoryWithCount[]> {
  return db.jobCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
          subcategories: true,
        },
      },
    },
  }) as Promise<CategoryWithCount[]>;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithSubcategories | null> {
  return db.jobCategory.findUnique({
    where: { slug },
    include: {
      subcategories: {
        orderBy: { sortOrder: 'asc' },
        include: {
          _count: {
            select: {
              jobs: { where: { status: 'ACTIVE', deletedAt: null } },
            },
          },
        },
      },
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
          subcategories: true,
        },
      },
    },
  }) as Promise<CategoryWithSubcategories | null>;
}

export async function getSubcategoryBySlug(slug: string): Promise<SubcategoryWithCategory | null> {
  return db.jobSubcategory.findUnique({
    where: { slug },
    include: {
      category: {
        select: {
          id: true,
          label: true,
          slug: true,
        },
      },
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
        },
      },
    },
  }) as Promise<SubcategoryWithCategory | null>;
}

export async function getPopularCategories(limit: number = 10): Promise<PopularCategory[]> {
  const categories = await db.jobCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
        },
      },
    },
  });

  return categories
    .map((c) => ({
      id: c.id,
      label: c.label,
      slug: c.slug,
      icon: c.icon,
      jobCount: c._count.jobs,
    }))
    .sort((a, b) => b.jobCount - a.jobCount)
    .slice(0, limit);
}
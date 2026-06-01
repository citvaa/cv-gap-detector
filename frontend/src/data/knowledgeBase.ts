import type { ExpertiseLevel } from '../types/api'

// Read-only ogledalo baze znanja iz backenda
// (service/.../service/KnowledgeBaseSeeder.java).
// VAZNO: baza znanja je hardkodirana u backendu - ovo je samo prikaz.
// Ako se seeder promeni, treba rucno azurirati i ovaj fajl.

export const SUPPORTED_TECHNOLOGIES = ['React', 'PostgreSQL', 'Java'] as const

export type SupportedTechnology = (typeof SUPPORTED_TECHNOLOGIES)[number]

// Za svaku tehnologiju, ocekivani koncepti po nivou (kao u seeder-u).
export const KNOWLEDGE_BASE: Record<
  SupportedTechnology,
  Record<ExpertiseLevel, string[]>
> = {
  React: {
    BEGINNER: ['JSX', 'components', 'props'],
    JUNIOR: ['JSX', 'components', 'props', 'useState', 'events'],
    MID: ['JSX', 'components', 'props', 'useState', 'useEffect', 'events', 'lifecycle'],
    SENIOR: [
      'JSX', 'components', 'props', 'useState', 'useEffect', 'context',
      'custom hooks', 'lifecycle', 'performance optimization',
    ],
    EXPERT: [
      'JSX', 'components', 'props', 'useState', 'useEffect', 'context',
      'custom hooks', 'lifecycle', 'performance optimization',
      'memoization', 'reconciliation',
    ],
  },
  PostgreSQL: {
    BEGINNER: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    JUNIOR: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'WHERE'],
    MID: ['SELECT', 'JOIN', 'WHERE', 'GROUP BY', 'INDEX', 'subqueries'],
    SENIOR: [
      'SELECT', 'JOIN', 'INDEX', 'EXPLAIN', 'transactions', 'ACID',
      'subqueries', 'window functions',
    ],
    EXPERT: [
      'SELECT', 'JOIN', 'INDEX', 'EXPLAIN', 'transactions', 'ACID',
      'subqueries', 'window functions', 'CTE', 'query optimization',
      'vacuum', 'replication',
    ],
  },
  Java: {
    BEGINNER: ['classes', 'objects', 'methods', 'variables'],
    JUNIOR: ['classes', 'objects', 'methods', 'inheritance', 'interfaces', 'collections'],
    MID: [
      'classes', 'inheritance', 'interfaces', 'collections', 'generics',
      'exceptions', 'streams',
    ],
    SENIOR: [
      'classes', 'interfaces', 'collections', 'generics', 'streams',
      'concurrency', 'threads', 'JVM', 'garbage collection',
    ],
    EXPERT: [
      'classes', 'interfaces', 'generics', 'streams', 'concurrency',
      'JVM', 'garbage collection', 'memory model', 'bytecode',
      'reactive programming', 'JIT compilation',
    ],
  },
}

// Mapiranje godina iskustva -> nivo (ExperienceLevelMapping iz seeder-a).
export const EXPERIENCE_MAPPING = [
  { min: 0, max: 0, level: 'BEGINNER' as ExpertiseLevel },
  { min: 1, max: 1, level: 'JUNIOR' as ExpertiseLevel },
  { min: 2, max: 3, level: 'MID' as ExpertiseLevel },
  { min: 4, max: 6, level: 'SENIOR' as ExpertiseLevel },
  { min: 7, max: 100, level: 'EXPERT' as ExpertiseLevel },
]

// Svi poznati koncepti za jednu tehnologiju (unija svih nivoa) - korisno za
// autocomplete/predlog u formi koncepata.
export function conceptsForTechnology(tech: string): string[] {
  const profile = (KNOWLEDGE_BASE as Record<string, Record<ExpertiseLevel, string[]>>)[tech]
  if (!profile) return []
  const all = new Set<string>()
  Object.values(profile).forEach((concepts) => concepts.forEach((c) => all.add(c)))
  return Array.from(all)
}

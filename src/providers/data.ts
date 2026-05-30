import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
import { API_URL } from "./constants";
import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from '@refinedev/core';
import type { Subject } from '@/Types';

const mockSubjects: Subject[] = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    department: 'CS',
    description:
      'Covers programming fundamentals, algorithms, data representation, and computational problem solving.',
    createdAt: '2026-01-10',
  },
  {
    id: 2,
    code: 'MATH201',
    name: 'Calculus II',
    department: 'Math',
    description:
      'Explores integration techniques, sequences, series, and applications of calculus in modeling.',
    createdAt: '2026-01-12',
  },
  {
    id: 3,
    code: 'ENG150',
    name: 'Academic Writing and Rhetoric',
    department: 'English',
    description:
      'Builds critical reading, research writing, argumentation, and revision skills for university-level work.',
    createdAt: '2026-01-14',
  },
];

export const dataProvider:DataProvider ={
  getList: async<TData extends BaseRecord = BaseRecord>({resource}:
  GetListParams): Promise<GetListResponse<TData>> =>{
    if(resource!== 'subjects') return {data:[] as TData[],total: 0};
    return{
      data: mockSubjects as unknown as TData[],
      total: mockSubjects.length,
    }

  },

  getOne: async () =>{ throw new Error('This function is not present in mock')},
  create: async () =>{ throw new Error('This function is not present in mock')},
  update: async () =>{ throw new Error('This function is not present in mock')},
  deleteOne: async () =>{ throw new Error('This function is not present in mock')},

  getApiUrl: () => "",
}

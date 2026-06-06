import { createDataProvider, type CreateDataProviderOptions } from '@refinedev/rest';

import { BACKEND_BASE_URL } from '@/providers/constants.ts';
import type { ListResponse } from '@/Types';

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,
    buildQueryParams: async ({ resource,pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const params: Record<string, string|number> = {page,limit:pageSize};
      filters?.forEach((filter)=>{
        const field= 'field' in filter ? filter.field : '';
        const value= String(filter.value);
        if(resource==='subjects'){
          if(field==='department')params.department=value;
          if(field==='name'||field ==='code')params.search=value;
        }
      })


      return params;
    },
    mapResponse: async (response) => {
      const payload = (await response.json()) as ListResponse;
      return payload.data ?? [];
    },
    getTotalCount: async (response) => {
      const payload = (await response.json()) as ListResponse & {
        total?: number;
      };

      return payload.pagination?.total ?? payload.total ?? payload.data?.length ?? 0;
    },
  },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export default dataProvider;

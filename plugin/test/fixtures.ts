import { GraphQLContext, GraphQLRequest, ResponseResolver, graphql } from "msw";

type Resolver<T> = ResponseResolver<
  GraphQLRequest<Record<string, any>>,
  GraphQLContext<T>,
  any
>;

export function resolveOnce<T>(data: T): Resolver<T> {
  return (_req, res, ctx) => {
    return res.once(ctx.data(data));
  };
}

export function resolve<T>(data: T): Resolver<T> {
  return (_req, res, ctx) => {
    return res(ctx.data(data));
  };
}

export function currentBulkOperation(status: BulkOperationStatus) {
  return {
    currentBulkOperation: {
      id: ``,
      status,
    },
  };
}

export const startOperation = graphql.mutation<BulkOperationRunQueryResponse>(
  "INITIATE_BULK_OPERATION",
  resolve({
    bulkOperationRunQuery: {
      bulkOperation: {
        id: "",
        objectCount: "0",
        query: "",
        status: "CREATED",
        url: "",
      },
      userErrors: [],
    },
  })
);

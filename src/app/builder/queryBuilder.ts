import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search as string; 
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }


  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'filter'];
    excludeFields.forEach((field) => delete queryObj[field]);

    if (queryObj.filter) {
      queryObj.author = queryObj.filter; 
      delete queryObj.filter; 
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }



  sortBy() {
    const sortByField = this.query.sortBy as string || 'createdAt';
    const sortOrder = this.query.sortOrder === 'asc' ? 1 : -1; 

    this.modelQuery = this.modelQuery.sort({ [sortByField]: sortOrder });

    return this;
  }


  
  sortOrder() {
    const sortByField = (this.query.sortBy as string) || "createdAt";
    const sortOrder = this.query.sortOrder === "asc" ? "" : "-";

    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortByField}`);

    return this;
  }

}

export default QueryBuilder;
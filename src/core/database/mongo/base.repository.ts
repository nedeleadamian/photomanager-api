// import { Injectable } from '@nestjs/common';
// import { Collection, Sort } from 'mongodb';
//
// export interface FindAndCountResult<T> {
//   items: T[];
//   count: number;
// }
//
// export interface UpdateOperation<T> {
//   query: Filter<T>;
//   update: Partial<T>;
// }
//
// @Injectable()
// export abstract class BaseRepository<T> {
//   protected abstract get collection(): Collection;
//
//   public getCollection(): Collection {
//     return this.collection;
//   }
//
//   public async find(
//     query: Filter<T>,
//     sort: Sort = { createdAt: 1 },
//     skip?: number | null,
//     limit?: number | null
//   ): Promise<T[]> {
//     let promise = this.collection.find(query);
//
//     if (sort) {
//       promise = promise.sort(sort);
//     }
//     if (skip !== undefined && skip !== null && skip !== 0) {
//       promise = promise.skip(skip);
//     }
//     if (limit !== undefined && limit !== null && limit !== 0) {
//       promise = promise.limit(limit);
//     }
//
//     return promise.toArray();
//   }
//
//   public async count(query: Filter<T>): Promise<number> {
//     return this.collection.countDocuments(query);
//   }
//
//   public async findAndCount(
//     query: FilterQuery<T>,
//     sort: Record<string, unknown> = { _id: 1 },
//     skip?: number | null,
//     limit?: number | null
//   ): Promise<FindAndCountResult<T>> {
//     let promise = this.collection.find(query);
//
//     const count = await promise.count();
//
//     if (sort) {
//       promise = promise.sort(sort);
//     }
//     if (skip !== undefined && skip !== null && skip !== 0) {
//       promise = promise.skip(skip);
//     }
//     if (limit !== undefined && limit !== null && limit !== 0) {
//       promise = promise.limit(limit);
//     }
//
//     return {
//       count,
//       items: await promise.toArray(),
//     };
//   }
//
//   public async aggregateAndCount(
//     pipeline: Record<string, unknown>[],
//     sort: Record<string, unknown> = { _id: 1 },
//     skip?: number | null,
//     limit?: number | null
//   ): Promise<FindAndCountResult<T>> {
//     let promise = this.collection.aggregate(pipeline);
//
//     const countItems = await this.collection
//       .aggregate([
//         ...pipeline,
//         {
//           $count: 'count',
//         },
//       ])
//       .toArray();
//
//     const count = countItems && countItems.length > 0 ? countItems[0].count : 0;
//
//     if (sort) {
//       promise = promise.sort(sort);
//     }
//     if (skip !== undefined && skip !== null && skip !== 0) {
//       promise = promise.skip(skip);
//     }
//     if (limit !== undefined && limit !== null && limit !== 0) {
//       promise = promise.limit(limit);
//     }
//
//     return {
//       count,
//       items: await promise.toArray(),
//     };
//   }
//
//   public async findOne(query: FilterQuery<T>): Promise<T | null> {
//     return this.collection.findOne(query);
//   }
//
//   public async insertOne(record: Partial<T>): Promise<T | null> {
//     const result = await this.collection.insertOne(record);
//
//     return this.collection.findOne({ _id: result.insertedId });
//   }
//
//   public async insertMany(records: Partial<T>[]): Promise<T[]> {
//     const result = await this.collection.insertMany(records);
//
//     return this.collection
//       .find({ _id: { $in: Object.values(result.insertedIds) } })
//       .toArray();
//   }
//
//   public async updateOne(
//     query: FilterQuery<T>,
//     update: Partial<T>
//   ): Promise<T | null> {
//     const result = await this.collection.findOneAndUpdate(
//       query,
//       {
//         $set: { ...update },
//       },
//       {
//         returnOriginal: false,
//       }
//     );
//
//     return result.value;
//   }
//
//   public async updateMany(
//     query: FilterQuery<T>,
//     update: Partial<T>
//   ): Promise<void> {
//     await this.collection.updateMany(query, {
//       $set: { ...update },
//     });
//   }
//
//   public async upsertOne(
//     query: FilterQuery<T>,
//     update: Partial<T>
//   ): Promise<T | null> {
//     await this.collection.updateOne(
//       query,
//       {
//         $set: { ...update },
//       },
//       {
//         upsert: true,
//       }
//     );
//
//     return this.findOne(query);
//   }
//
//   public async updateManyByOperations(
//     operations: UpdateOperation<T>[]
//   ): Promise<T[]> {
//     const bulk = this.collection.initializeUnorderedBulkOp();
//
//     for (const operation of operations) {
//       bulk
//         .find(operation.query)
//         .upsert()
//         .update({ $set: { ...operation.update } });
//     }
//
//     await bulk.execute();
//
//     return this.collection
//       .find({ $or: operations.map((o) => o.query) })
//       .toArray();
//   }
//
//   public async deleteOne(query: FilterQuery<T>): Promise<boolean> {
//     const result = await this.collection.deleteOne(query);
//
//     return result.result.ok === 1;
//   }
//
//   public async deleteMany(query: FilterQuery<T>): Promise<boolean> {
//     const result = await this.collection.deleteMany(query);
//
//     return result.result.ok === 1;
//   }
//
//   public async aggregate<K>(operations: Record<string, unknown>[]): Promise<K[]> {
//     return this.collection.aggregate(operations).toArray();
//   }
// }

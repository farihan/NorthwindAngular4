using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NorthwindAngular4.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrder<T>(this IQueryable<T> query, string sortBy, Dictionary<string, Expression<Func<T, object>>> columnsMap, bool isSortAscending)
        {
            if (string.IsNullOrWhiteSpace(sortBy) || !columnsMap.ContainsKey(sortBy))
                return query;

            if (isSortAscending)
                return query.OrderBy(columnsMap[sortBy]);
            else
                return query.OrderByDescending(columnsMap[sortBy]);
        }
    }
}

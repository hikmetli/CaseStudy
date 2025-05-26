using API.Dto.Transaction;
using API.Entity;

namespace API.Extensions;

public static class TransactionExtentions
{

    public static IQueryable<TransactionDto> TransactionToDto(this IQueryable<Transaction> query)
    {
        return query.Select(transaction => new TransactionDto
        {
            Id = transaction.Id,
            UserId = transaction.UserId,
            Description = transaction.Description,
            Amount = transaction.Amount,
            CategoryId = transaction.CategoryId,
            Date = transaction.Date

        });
    }

    public static TransactionDto ToDto(this Transaction transaction)
    {
        return new TransactionDto
        {
            Id = transaction.Id,
            UserId = transaction.UserId,
            Description = transaction.Description,
            Amount = transaction.Amount,
            CategoryId = transaction.CategoryId,
            Date = transaction.Date
        };
    }
    public static IQueryable<Transaction> Sort(this IQueryable<Transaction> query, string? orderBy)
    {
        return orderBy switch
        {
            "dateDesc" => query.OrderByDescending(p => p.Date),
            _ => query.OrderBy(p => p.Date)
        };
    }

    public static IQueryable<Transaction> Search(this IQueryable<Transaction> query, string? searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm)) return query;

        var lowerCaseTerm = searchTerm.Trim().ToLower();

        return query.Where(p => p.Description.ToLower().Contains(lowerCaseTerm));
    }

    public static IQueryable<Transaction> Filter(this IQueryable<Transaction> query, string? categories, DateTime? dateFrom = null, DateTime? dateTo = null)
    {
        if (dateFrom.HasValue)
        {
            query = query.Where(p => p.Date >= dateFrom.Value);
        }

        if (dateTo.HasValue)
        {
            query = query.Where(p => p.Date <= dateTo.Value);
        }

        var categoryList = new List<string>();

        if (!string.IsNullOrEmpty(categories))
        {
            categoryList.AddRange(categories.ToLower().Split(",").ToList());
        }

        query = query.Where(p => categoryList.Count == 0 || categoryList.Contains(p.CategoryId.ToString()));

        return query;
    }


}

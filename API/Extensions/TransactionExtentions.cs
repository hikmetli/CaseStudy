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
            CategoryId = transaction.CategoryId
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
            CategoryId = transaction.CategoryId
        };
    }


}

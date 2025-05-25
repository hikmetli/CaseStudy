using API.DataAccess;
using API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(Context context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var categories = await context.Category.ToListAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            var oldCategory = await context.Category.Where(ct => ct.Name == category.Name).FirstOrDefaultAsync();
            if (oldCategory != null)
            {
                return Ok(oldCategory);
            }


            await context.Category.AddAsync(category);
            var result = await context.SaveChangesAsync() > 0;

            if (!result) return BadRequest();

            return Ok(category);
        }

    }
}

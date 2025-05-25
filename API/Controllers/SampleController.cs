// using API.Businness;
// using API.Entity;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.CodeAnalysis;

// namespace API.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class SampleController(ISampleService sampleService) : ControllerBase
//     {

//         [HttpGet]
//         public IActionResult SampleList()
//         {
//             var values = sampleService.TGetList();
//             return Ok(values);
//         }

//         [HttpGet("{id}")]
//         public IActionResult GetSample(int id)
//         {
//             Sample s = sampleService.TGetById(id);
//             if (s == null) return BadRequest("No such an Sample");
//             return Ok(s);
//         }


//         [HttpPost]
//         public IActionResult CreateSample(Sample sample)
//         {
//             sampleService.TInsert(sample);
//             return Ok();
//         }

//         [HttpDelete("{id}")]
//         public IActionResult DeleteSample(int id)
//         {
//             Sample s = sampleService.TGetById(id);
//             if (s == null) return BadRequest("No such an Sample");

//             sampleService.TDelete(s);
//             return Ok();
//         }

//         [HttpPut]
//         public IActionResult UpdateSample(Sample sample)
//         {
//             sampleService.TUpdate(sample);
//             return Ok();
//         }


//     }
// }

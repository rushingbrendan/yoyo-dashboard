using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YoYoPlantDashboard;
using Microsoft.AspNetCore.Authorization;

namespace YoYoPlantDashboard.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DefectController : ControllerBase
    {
        private readonly ILogger<DefectController> _logger;

        public DefectController(ILogger<DefectController> logger)
        {
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("/getDefects/{id}")]
        public IEnumerable<Defect> Get(int id)
        {
            //todo
            // Replace this random data with call to database.
            // Get all defects for this day related to id.
            // Id = 0 for all, or maps to product id.
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Defect
            {
                DefectName = $"Defect Name - {index}",
                Defects = rng.Next(0, 2500),
            })
            .ToArray();
        }
    }
}

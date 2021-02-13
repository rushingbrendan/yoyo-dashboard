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
    public class DataController : ControllerBase
    {
        private readonly ILogger<DataController> _logger;

        public DataController(ILogger<DataController> logger)
        {
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("/getData/{id}")]
        public PlantData Get(int id)
        {
            //todo
            // Replace this random data with call to database.
            // Get all defects for this day related to id.
            // Id = 0 for all, or maps to product id.

            var rng = new Random();
            var data = new PlantData();
            data.TotalPartsMolded = rng.Next(0, 10000);
            data.TotalPartsPackaged = rng.Next(0, 10000);
            data.TotalPartsSuccessAssembly = rng.Next(0, 10000);
            data.TotalPartsSuccessMolded = rng.Next(0, 10000);
            data.TotalPartsSuccessPaint = rng.Next(0, 10000);

            //data.YieldAtMold = data.TotalPartsSuccessMolded / data.TotalPartsMolded;
            //data.YieldAtPaint = data.TotalPartsSuccessPaint / data.TotalPartsSuccessMolded;
            //data.YieldAtAssembly = data.TotalPartsSuccessAssembly / data.TotalPartsSuccessPaint;
            //data.TotalYield = data.TotalPartsPackaged / data.TotalPartsMolded;

            double rand = rng.NextDouble();
            data.YieldAtMold = (float)rand;

            rand = rng.NextDouble();
            data.YieldAtPaint = (float)rand;

            rand = rng.NextDouble();
            data.YieldAtAssembly = (float)rand;

            rand = rng.NextDouble();
            data.TotalYield = (float)rand;

            return data;
        }
    }
}

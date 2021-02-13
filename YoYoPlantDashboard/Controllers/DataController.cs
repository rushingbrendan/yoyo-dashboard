/*
 *   FILE          : DataController.cs
 *   PROJECT       : SENG3120 - Business Intelligence - Assignment #2
 *   PROGRAMMER    : Brendan Rushing
 *   FIRST VERSION : 2021-02-13
 *   DESCRIPTION   :   Create a live reportwith the following requirements:
 *                      a.Allow the user to choose any one, or all, of the products to perform the calculations for the report.
 *                        The choice may be changed any timeby the user, and the report should be updated immediately upon change.
 *
 *                      b.Use the MS Chartcontrol to display a Pareto diagram showing the reasons for rejection (rework and scrap combined).
 *                      c.Make sure to show the actual numbers on the chart.
 *                      d.In addition to the Pareto diagram, display the following information based on the chosen product (or all products):
 *                        i.Total parts molded
 *                        ii.Total parts successfully molded
 *                        iii.Yield at Mold: (Total parts successfully molded) / (Total parts molded)
 *                        iv.Total parts successfully painted
 *                        v.Yield at Paint: (Total parts successfully painted) / (Total parts successfully molded)
 *                        vi.Total parts successfully assembledvii.Yield at Assembly: (Total parts successfully assembled) / (Total parts successfully painted)
 *                        viii.Total parts packaged
 *                        ix.Total Yield: (Total parts packaged) / (Total parts molded)
 *                      e.The data should be updated automaticallyusing a timer or manually using a button on the report
 * */

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
    /// <summary>
    /// DataController
    /// </summary>
    [ApiController]
    [Route("[controller]")]   
    public class DataController : ControllerBase
    {
        /// <summary>
        /// Logger
        /// </summary>
        private readonly ILogger<DataController> _logger;

        /// <summary>
        /// DataController constructor
        /// </summary>
        /// <param name="logger"></param>
        public DataController(ILogger<DataController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

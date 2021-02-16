/*
 *   FILE          : DefectController.cs
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
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace YoYoPlantDashboard.Controllers
{
    /// <summary>
    /// DefectController
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class DefectController : ControllerBase
    {
        /// <summary>
        /// Logger
        /// </summary>
        private readonly ILogger<DefectController> _logger;

        /// <summary>
        /// Configuration
        /// </summary>
        private readonly IConfiguration _config;

        /// <summary>
        /// Connection string for database.
        /// </summary>
        private string _connectionString;

        /// <summary>
        /// DefectController constructor
        /// </summary>
        /// <param name="logger"></param>
        public DefectController(ILogger<DefectController> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;

            _connectionString = _config.GetValue<string>("DatabaseConnectionString");
        }

        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("/getDefects/{id}")]
        public IEnumerable<Defect> Get(int id)
        {
            List<Defect> ld = new List<Defect>();
            string queryString;
            if (id == 0)
            {
                queryString = "SELECT Notes, count(*) FROM [yoyo_db].[dbo].[Yoyo_table] GROUP BY Notes;";
            }
            else
            {
                queryString = $"SELECT Notes, count(*) FROM [yoyo_db].[dbo].[Yoyo_table] WHERE ID = {id} GROUP BY Notes;";
            }
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader sqlDataReader = command.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (sqlDataReader.GetString(0) != "")
                        ld.Add(new Defect
                        {
                            DefectName = sqlDataReader.GetString(0),
                            Defects = sqlDataReader.GetInt32(1),
                        });
                }
            }
            //todo
            // Replace this random data with call to database.
            // Get all defects for this day related to id.
            // Id = 0 for all, or maps to product id.
            return ld;
        }
    }
}

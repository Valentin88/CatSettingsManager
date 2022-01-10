using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatController : ControllerBase
    {

        private readonly ILogger<CatController> _logger;

        private Cat myCat;

        private const int catId = 1;

        public CatController(ILogger<CatController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult <Cat> Get (int id)
       {          

            myCat = GetCatValue(id);

            try
            {
                return Ok(myCat);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get cat: {ex}");
                return BadRequest("failed to get cat");
            }           
       }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<Cat> PutCat(int id, Cat cat)
        {
            SetCatValue(id, cat);

           try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get cat: {ex}");
                return BadRequest("failed to get cat");
            }
        }

        [HttpPost]
        public ActionResult<Cat> Post(Cat cat)
        {        

            try
            {
                SetCatValue(catId, cat);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get cat: {ex}");
                return BadRequest("failed to get cat");
            }
        }      

        private void SetCatValue (int id, Cat cat)
        {
            HttpContext.Session.Set<Cat>(id, cat);
        }

        private Cat GetCatValue(int id)
        {
            if (HttpContext.Session.Get<Cat>(id) == default)
            {
                return null;
            }
            else
            {
               return HttpContext.Session.Get<Cat>(id);
            }
        }
    }


}


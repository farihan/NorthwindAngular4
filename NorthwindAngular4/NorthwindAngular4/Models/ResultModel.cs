using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindAngular4.Models
{
    public class ResultModel<T>
    {
        public int TotalRecords { get; set; }
        public List<T> Records { get; set; }
    }
}

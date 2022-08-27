﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ValueObjects
{
    public class Country : ValueObject
    {
        public int Id { get; set; }
        public string CountryCode { get; set; }
        public string Name { get; set; }
    }
}

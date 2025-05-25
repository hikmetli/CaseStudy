using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entity;

public class Sample
{
    public int Id { get; set; }

    public required string Name { get; set; }
}

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Polzovatel
{
    [Key]
    public int Id { get; set; }
    public string Imya { get; set; } = "";
    public string Pochta { get; set; } = "";
    public string HashParolya { get; set; } = "";
    public DateTime Sozdan { get; set; }
    public bool DvuhetapnayaAvtorizaciya { get; set; }
    public string? Avatar { get; set; }
    public string Rol { get; set; } = "Buyer";

    [JsonIgnore]
    public virtual ICollection<Zhelaemoe> Zhelaemoe { get; set; } = new List<Zhelaemoe>();

    [JsonIgnore]
    public virtual ICollection<Korzina> Korzina { get; set; } = new List<Korzina>();

    [JsonIgnore]
    public virtual ICollection<IgraPolzovatelya> Biblioteka { get; set; } = new List<IgraPolzovatelya>();
}
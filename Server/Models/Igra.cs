using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Igra
{
    [Key]
    public int Id { get; set; }
    public string Nazvanie { get; set; } = "";
    public decimal Tsena { get; set; }
    public string Opisanie { get; set; } = "";
    public string Kartinka { get; set; } = "";
    public string Razrabotchik { get; set; } = "";
    public string Izdatel { get; set; } = "";
    public DateTime DataVyhoda { get; set; }
    public string Zhanr { get; set; } = "";
    public string Tegi { get; set; } = "";
    public string Trebovaniya { get; set; } = "";

    [JsonIgnore]
    public virtual ICollection<Zhelaemoe> Zhelaemoe { get; set; } = new List<Zhelaemoe>();

    [JsonIgnore]
    public virtual ICollection<Korzina> Korzina { get; set; } = new List<Korzina>();

    [JsonIgnore]
    public virtual ICollection<IgraPolzovatelya> Biblioteka { get; set; } = new List<IgraPolzovatelya>();
}

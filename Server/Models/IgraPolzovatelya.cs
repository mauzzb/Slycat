using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class IgraPolzovatelya
{
    [Key]
    public int Id { get; set; }
    public int PolzovatelId { get; set; }
    public int IgraId { get; set; }
    public DateTime Kupleno { get; set; }        // дата
    public bool Ustanovlena { get; set; }        // проверяет установили ли игру
    public int VremyaIgry { get; set; }          // время

    [JsonIgnore]
    public virtual Polzovatel? Polzovatel { get; set; }

    public virtual Igra? Igra { get; set; }
}

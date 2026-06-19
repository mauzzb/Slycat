using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Korzina
{
    [Key]
    public int Id { get; set; }
    public int PolzovatelId { get; set; }
    public int IgraId { get; set; }
    public DateTime Dobavleno { get; set; }

    [JsonIgnore]
    public virtual Polzovatel? Polzovatel { get; set; }

    public virtual Igra? Igra { get; set; }
}

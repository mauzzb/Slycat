using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Zhelaemoe
{
    [Key]
    public int Id { get; set; }
    public int PolzovatelId { get; set; }   // айди пользователя
    public int IgraId { get; set; }         // айди игры
    public DateTime Dobavleno { get; set; } // дата кога добавили

    [JsonIgnore]
    public virtual Polzovatel? Polzovatel { get; set; } //  юзер

    public virtual Igra? Igra { get; set; }//  игра 
}

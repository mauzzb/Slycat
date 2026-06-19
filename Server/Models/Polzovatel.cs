using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Polzovatel
{
    [Key]  // ключ в таблице
    public int Id { get; set; }
    public string Imya { get; set; } = "";
    public string Pochta { get; set; } = "";
    public string HashParolya { get; set; } = "";  // пароль в зашифрованном виде
    public DateTime Sozdan { get; set; }            // дата зарегистрировался
    public bool DvuhetapnayaAvtorizaciya { get; set; }
    public string? Avatar { get; set; }             // сс на аватар (base64 строка)

    [JsonIgnore] 
    public virtual ICollection<Zhelaemoe> Zhelaemoe { get; set; } = new List<Zhelaemoe>();

    [JsonIgnore]
    public virtual ICollection<Korzina> Korzina { get; set; } = new List<Korzina>();

    [JsonIgnore]
    public virtual ICollection<IgraPolzovatelya> Biblioteka { get; set; } = new List<IgraPolzovatelya>();
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/igry")]
public class IgryKontroller : ControllerBase
{
    private readonly KontekstBazy _db;

    public IgryKontroller(KontekstBazy db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> PoluchitVse([FromQuery] string? poisk, [FromQuery] string? zhanr)
    {
        var query = _db.Igry.AsQueryable();

        if (!string.IsNullOrEmpty(poisk))
            query = query.Where(g => g.Nazvanie.Contains(poisk));

        if (!string.IsNullOrEmpty(zhanr))
            query = query.Where(g => g.Zhanr == zhanr);

        return Ok(await query.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> PoluchitPoId(int id)
    {
        var igra = await _db.Igry.FindAsync(id);
        if (igra == null) return NotFound();
        return Ok(igra);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Dobavit([FromBody] ZaprosIgry zapros)
    {
        var igra = new Igra
        {
            Nazvanie = zapros.Nazvanie,
            Tsena = zapros.Tsena,
            Opisanie = zapros.Opisanie,
            Kartinka = zapros.Kartinka,
            Razrabotchik = zapros.Razrabotchik,
            Izdatel = zapros.Izdatel,
            DataVyhoda = zapros.DataVyhoda,
            Zhanr = zapros.Zhanr,
            Tegi = zapros.Tegi,
            Trebovaniya = zapros.Trebovaniya
        };

        _db.Igry.Add(igra);
        await _db.SaveChangesAsync();
        return Ok(igra);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Udalit(int id)
    {
        var igra = await _db.Igry.FindAsync(id);
        if (igra == null) return NotFound();
        _db.Igry.Remove(igra);
        await _db.SaveChangesAsync();
        return Ok();
    }
}

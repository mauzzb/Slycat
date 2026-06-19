using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/korzina")]
[Authorize]
public class KorzinaKontroller : ControllerBase
{
    private readonly KontekstBazy _db;

    public KorzinaKontroller(KontekstBazy db)
    {
        _db = db;
    }

    private int PoluchitIdPolzovatelya() =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

    [HttpGet]
    public async Task<IActionResult> PoluchitMoyuKorzinu()
    {
        var userId = PoluchitIdPolzovatelya();
        var items = await _db.Korzina
            .Include(c => c.Igra)
            .Where(c => c.PolzovatelId == userId)
            .OrderByDescending(c => c.Dobavleno)
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> Dobavit([FromBody] int igraId)
    {
        var userId = PoluchitIdPolzovatelya();

        var uzheEst = await _db.Korzina
            .FirstOrDefaultAsync(c => c.PolzovatelId == userId && c.IgraId == igraId);

        if (uzheEst != null)
            return BadRequest(new { soobshenie = "Игра уже в корзине" });

        var item = new Korzina
        {
            PolzovatelId = userId,
            IgraId = igraId,
            Dobavleno = DateTime.UtcNow
        };

        _db.Korzina.Add(item);
        await _db.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Udalit(int id)
    {
        var userId = PoluchitIdPolzovatelya();
        var item = await _db.Korzina
            .FirstOrDefaultAsync(c => c.Id == id && c.PolzovatelId == userId);
        if (item == null) return NotFound();

        _db.Korzina.Remove(item);
        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("ochistit")]
    public async Task<IActionResult> Ochistit()
    {
        var userId = PoluchitIdPolzovatelya();
        var items = _db.Korzina.Where(c => c.PolzovatelId == userId);
        _db.Korzina.RemoveRange(items);
        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("oplatit")]
    public async Task<IActionResult> Oplatit()
    {
        var userId = PoluchitIdPolzovatelya();
        var korzina = await _db.Korzina
            .Where(c => c.PolzovatelId == userId)
            .ToListAsync();

        foreach (var item in korzina)
        {
            var uzheEst = await _db.Biblioteka
                .FirstOrDefaultAsync(ug => ug.PolzovatelId == userId && ug.IgraId == item.IgraId);

            if (uzheEst == null)
            {
                _db.Biblioteka.Add(new IgraPolzovatelya
                {
                    PolzovatelId = userId,
                    IgraId = item.IgraId,
                    Kupleno = DateTime.UtcNow,
                    Ustanovlena = false,
                    VremyaIgry = 0
                });
            }
        }

        _db.Korzina.RemoveRange(korzina);
        await _db.SaveChangesAsync();

        return Ok(new { soobshenie = "Покупка успешно оформлена" });
    }
}

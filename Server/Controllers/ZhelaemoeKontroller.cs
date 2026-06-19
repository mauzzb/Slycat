using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/zhelaemoe")]
[Authorize]
public class ZhelaemoeKontroller : ControllerBase
{
    private readonly KontekstBazy _db;

    public ZhelaemoeKontroller(KontekstBazy db)
    {
        _db = db;
    }

    private int PoluchitIdPolzovatelya() =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

    [HttpGet]
    public async Task<IActionResult> PoluchitMoyoZhelaemoe()
    {
        var userId = PoluchitIdPolzovatelya();
        var items = await _db.Zhelaemoe
            .Include(w => w.Igra)
            .Where(w => w.PolzovatelId == userId)
            .OrderByDescending(w => w.Dobavleno)
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> Dobavit([FromBody] int igraId)
    {
        var userId = PoluchitIdPolzovatelya();

        var uzheEst = await _db.Zhelaemoe
            .FirstOrDefaultAsync(w => w.PolzovatelId == userId && w.IgraId == igraId);

        if (uzheEst != null)
            return BadRequest(new { soobshenie = "Игра уже в списке желаемого" });

        var item = new Zhelaemoe
        {
            PolzovatelId = userId,
            IgraId = igraId,
            Dobavleno = DateTime.UtcNow
        };

        _db.Zhelaemoe.Add(item);
        await _db.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Udalit(int id)
    {
        var userId = PoluchitIdPolzovatelya();
        var item = await _db.Zhelaemoe
            .FirstOrDefaultAsync(w => w.Id == id && w.PolzovatelId == userId);
        if (item == null) return NotFound();

        _db.Zhelaemoe.Remove(item);
        await _db.SaveChangesAsync();
        return Ok();
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/biblioteka")]
[Authorize]
public class BibliotekaKontroller : ControllerBase
{
    private readonly KontekstBazy _db;

    public BibliotekaKontroller(KontekstBazy db)
    {
        _db = db;
    }

    private int PoluchitIdPolzovatelya() =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

    [HttpGet]
    public async Task<IActionResult> PoluchitMoyuBiblioteku()
    {
        var userId = PoluchitIdPolzovatelya();
        var igry = await _db.Biblioteka
            .Include(ug => ug.Igra)
            .Where(ug => ug.PolzovatelId == userId)
            .OrderByDescending(ug => ug.Kupleno)
            .ToListAsync();

        return Ok(igry);
    }
}

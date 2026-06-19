using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/polzovatel")]
[Authorize]
public class PolzovatelKontroller : ControllerBase
{
    private readonly KontekstBazy _db;

    public PolzovatelKontroller(KontekstBazy db)
    {
        _db = db;
    }

    private int PoluchitIdPolzovatelya() =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

    [HttpGet("profil")]
    public async Task<IActionResult> PoluchitProfil()
    {
        var userId = PoluchitIdPolzovatelya();
        var polzovatel = await _db.Polzovateli.FindAsync(userId);
        if (polzovatel == null) return NotFound();

        return Ok(new
        {
            polzovatel.Id,
            polzovatel.Imya,
            polzovatel.Pochta,
            polzovatel.Avatar,
            polzovatel.Sozdan,
            polzovatel.DvuhetapnayaAvtorizaciya
        });
    }

    [HttpPut("profil")]
    public async Task<IActionResult> ObnovitProfil([FromBody] ZaprosProfilya zapros)
    {
        var userId = PoluchitIdPolzovatelya();
        var polzovatel = await _db.Polzovateli.FindAsync(userId);
        if (polzovatel == null) return NotFound();

        if (await _db.Polzovateli.AnyAsync(u => u.Pochta == zapros.Pochta && u.Id != userId))
            return BadRequest(new { soobshenie = "Email уже используется" });

        if (await _db.Polzovateli.AnyAsync(u => u.Imya == zapros.Imya && u.Id != userId))
            return BadRequest(new { soobshenie = "Имя пользователя уже занято" });

        polzovatel.Imya = zapros.Imya;
        polzovatel.Pochta = zapros.Pochta;

        await _db.SaveChangesAsync();
        return Ok(new { polzovatel.Imya, polzovatel.Pochta });
    }

    [HttpPost("avatar")]
    public async Task<IActionResult> ObnovitAvatar([FromBody] ZaprosAvatara zapros)
    {
        var userId = PoluchitIdPolzovatelya();
        var polzovatel = await _db.Polzovateli.FindAsync(userId);
        if (polzovatel == null) return NotFound();

        polzovatel.Avatar = zapros.Avatar;
        await _db.SaveChangesAsync();

        return Ok(new { soobshenie = "Аватар обновлен" });
    }

    [HttpPost("smenit-parol")]
    public async Task<IActionResult> SmenitParol([FromBody] ZaprosSmenyParolya zapros)
    {
        var userId = PoluchitIdPolzovatelya();
        var polzovatel = await _db.Polzovateli.FindAsync(userId);
        if (polzovatel == null) return NotFound();

        if (!HeshirovanieParolya.Proverit(zapros.StaryjParol, polzovatel.HashParolya))
            return BadRequest(new { soobshenie = "Неверный текущий пароль" });

        polzovatel.HashParolya = HeshirovanieParolya.Zheshirovat(zapros.NovyjParol);
        await _db.SaveChangesAsync();

        return Ok(new { soobshenie = "Пароль успешно изменен" });
    }
}

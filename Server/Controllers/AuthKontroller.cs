using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/auth")]
public class AuthKontroller : ControllerBase
{
    private readonly KontekstBazy _db;

    public AuthKontroller(KontekstBazy db)
    {
        _db = db;
    }

    [HttpPost("registraciya")]
    public async Task<IActionResult> Registraciya([FromBody] ZaprosRegistracii zapros)
    {
        if (await _db.Polzovateli.AnyAsync(u => u.Pochta == zapros.Email))
            return BadRequest(new { soobshenie = "Email уже зарегистрирован" });

        if (await _db.Polzovateli.AnyAsync(u => u.Imya == zapros.Username))
            return BadRequest(new { soobshenie = "Имя пользователя уже занято" });

        var polzovatel = new Polzovatel
        {
            Imya = zapros.Username,
            Pochta = zapros.Email,
            HashParolya = HeshirovanieParolya.Zheshirovat(zapros.Password),
            Sozdan = DateTime.UtcNow,
            DvuhetapnayaAvtorizaciya = false
        };

        _db.Polzovateli.Add(polzovatel);
        await _db.SaveChangesAsync();

        return Ok(new { soobshenie = "Регистрация успешна", userId = polzovatel.Id });
    }

    [HttpPost("vhod")]
    public async Task<IActionResult> Vhod([FromBody] ZaprosVhoda zapros)
    {
        var polzovatel = await _db.Polzovateli.FirstOrDefaultAsync(u => u.Pochta == zapros.Email);

        if (polzovatel == null || !HeshirovanieParolya.Proverit(zapros.Password, polzovatel.HashParolya))
            return Unauthorized(new { soobshenie = "Неверный email или пароль" });

        var token = SozdatToken(polzovatel);

        return Ok(new
        {
            token,
            userId = polzovatel.Id,
            username = polzovatel.Imya,
            email = polzovatel.Pochta,
            avatar = polzovatel.Avatar
        });
    }

    private string SozdatToken(Polzovatel polzovatel)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, polzovatel.Id.ToString()),
            new Claim(ClaimTypes.Name, polzovatel.Imya),
            new Claim(ClaimTypes.Email, polzovatel.Pochta)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("SlyCatSecretKey2024VeryLongAndSecure123!@#$"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: "SlyCat",
            audience: "SlyCat",
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
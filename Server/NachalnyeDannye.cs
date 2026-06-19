using Microsoft.EntityFrameworkCore;

public static class NachalnyeDannye
{
    public static async Task ZapolnitAsync(KontekstBazy db)
    {
        if (!db.Polzovateli.Any())
        {
            db.Polzovateli.Add(new Polzovatel
            {
                Imya = "testuser",
                Pochta = "test@test.com",
                HashParolya = HeshirovanieParolya.Zheshirovat("123456"),
                Sozdan = DateTime.UtcNow,
                DvuhetapnayaAvtorizaciya = false
            });
        }
        await db.SaveChangesAsync();
    }
}

using Microsoft.EntityFrameworkCore;

public class KontekstBazy : DbContext
{
    public KontekstBazy(DbContextOptions<KontekstBazy> options) : base(options) { }
    public DbSet<Polzovatel> Polzovateli { get; set; }
    public DbSet<Igra> Igry { get; set; }
    public DbSet<Zhelaemoe> Zhelaemoe { get; set; }
    public DbSet<Korzina> Korzina { get; set; }
    public DbSet<IgraPolzovatelya> Biblioteka { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Polzovatel>().HasIndex(u => u.Pochta).IsUnique();
        modelBuilder.Entity<Polzovatel>().HasIndex(u => u.Imya).IsUnique();
    }
}

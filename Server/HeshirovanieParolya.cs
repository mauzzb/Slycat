using System.Security.Cryptography;
using System.Text;

public static class HeshirovanieParolya
{
    public static string Zheshirovat(string parol)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(parol);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }

    public static bool Proverit(string parol, string hash)
    {
        return Zheshirovat(parol) == hash;
    }
}

using System;
using System.Text.Json;
using API.Dto.Account;
using API.Entity;

namespace API.Services;

public class IbanVerificationService(HttpClient httpClient, IConfiguration configuration)
{
    public async Task<IbanVerificationDto?> VerifyIbanAsync(string iban)
    {
        var IbanBase = configuration["IbanVerifier:IbanUrl"];

        if (string.IsNullOrWhiteSpace(iban))
        {
            throw new ArgumentException("IBAN cannot be null or empty.", nameof(iban));
        }

        var response = await httpClient.PostAsJsonAsync($"{IbanBase}/iban/verify", new { Iban = iban });
        if (!response.IsSuccessStatusCode) return null;

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<IbanVerificationDto>(content,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        return result;
    }

    public async Task<Iban?> CreateIbanAsync(int acc_id)
    {
        var IbanBase = configuration["IbanVerifier:IbanUrl"];
        if (acc_id <= 0)
        {
            throw new ArgumentException("Account ID must be a positive integer.", nameof(acc_id));
        }



        var response = await httpClient.PostAsJsonAsync($"{IbanBase}/iban/create", new IbanCreateDto { AccountId = acc_id });
        if (!response.IsSuccessStatusCode) return null;


        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Iban>(content,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        return result;
    }

    public async Task<Iban?> GetIbanAsync(int id)
    {
        var IbanBase = configuration["IbanVerifier:IbanUrl"];

        var response = await httpClient.GetAsync($"{IbanBase}/iban?AccountId={id}");
        if (!response.IsSuccessStatusCode) return null;

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Iban>(content,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        return result;
        // Optionally, you can handle the response if needed
    }
}

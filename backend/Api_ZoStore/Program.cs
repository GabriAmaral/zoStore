using Api_ZoStore.Models.DataBase;
using Api_ZoStore.Repositories.Implantation;
using Api_ZoStore.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<DataBaseContext>(x => x.UseMySql(
    builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.Parse("10.4.24")
));

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
//builder.Services.AddScoped<IVotosRepository, VotosRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
}
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

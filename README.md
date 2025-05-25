# dotnet katmanlı mimari eklemeler
Entity
DataAcces->Abstract->...Dal
DataAcces->Repository->...Repository
DataAccess->EntityFramework->Ef...dal
BusinnessLayer->I...service
BusinnesLayer->manager

en son program.cs'e

builder.Services.AddScoped<ISampleDal, EfSampleDal>();
builder.Services.AddScoped<ISampleService, SampleManager>();
from django.db import models


class Car(models.Model):
    name = models.CharField(max_length=64)
    model = models.CharField(max_length=64)
    year = models.IntegerField()
    color = models.CharField(max_length=64)
    price = models.IntegerField()
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name

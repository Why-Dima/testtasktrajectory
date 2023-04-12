from django.shortcuts import render
from rest_framework.views import APIView
from .models import Car
from .serializer import CarSerializer
from rest_framework.response import Response


class CarView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'model': output.model,
                'year': output.year,
                'color': output.color,
                'price': output.price,
            } for output in Car.objects.all()
        ]
        return Response(output)
    
    def post(self, request):
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)




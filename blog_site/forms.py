from django import forms
from .models import Gaming

class GamingListForm(forms.ModelForm):
  class Meta:
    model = Gaming
    fields = "__all__"

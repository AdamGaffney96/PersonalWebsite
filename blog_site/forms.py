from django import forms
from .models import Gaming, Contact, Essay

class GamingListForm(forms.ModelForm):
  class Meta:
    model = Gaming
    fields = "__all__"

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = "__all__"
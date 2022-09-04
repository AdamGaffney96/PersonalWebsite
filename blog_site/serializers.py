from rest_framework import serializers
from .models import *

class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ("keyword",)

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ("type",)

class GamingSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
    type = TypeSerializer(many=True)
    class Meta:
        model = Gaming
        fields = ("title", "thumb", "slug", "desc", "content", "keywords", "author", "type", "post_date", "last_edited", "article_type")

class EssaySerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
    type = TypeSerializer(many=True)
    class Meta:
        model = Essay
        fields = ("title", "thumb", "slug", "desc", "content", "keywords", "author", "type", "post_date", "last_edited", "article_type")

class ProjectSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
    type = TypeSerializer(many=True)
    class Meta:
        model = Project
        fields = ("title", "thumb", "slug", "desc", "html", "keywords", "type", "post_date", "last_edited", "article_type")

class SudokuSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
    type = TypeSerializer(many=True)
    class Meta:
        model = Project
        fields = ("title", "slug", "ruleset", "board", "html", "keywords", "type", "post_date", "last_edited")

class CheatsheetSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheatsheetSection
        fields = ("language", "title", "verbose", "code_block", "description", "post_date", "last_edited")
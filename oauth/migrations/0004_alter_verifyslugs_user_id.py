# Generated by Django 4.2.3 on 2023-07-08 15:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
        ('oauth', '0003_rename_user_name_verifyslugs_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='verifyslugs',
            name='user_id',
            field=models.OneToOneField(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='main.users', to_field='unique_id'),
        ),
    ]
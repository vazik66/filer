from marshmallow import Schema, fields


class FileCreateSchema(Schema):
    password = fields.Str(required=False, missing=None)
    max_views = fields.Int(required=False, validate=lambda val: val > 0, missing=10000)
    time_to_live = fields.Int(required=False, validate=lambda val: val in (7, 14, 30), missing=7)



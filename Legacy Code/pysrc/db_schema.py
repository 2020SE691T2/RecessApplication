users_schema = """
EMAIL_ADDRESS VARCHAR PRIMARY KEY,
FIRST_NAME VARCHAR NOT NULL,
LAST_NAME VARCHAR NOT NULL,
PREFERRED_NAME VARCHAR,
PASSWORD VARCHAR NOT NULL,
PHYSICAL_ID_NUM VARCHAR,
DOB DATE NOT NULL,
ROLE VARCHAR NOT NULL
"""

classes_schema = """
CLASS_ID INTEGER PRIMARY KEY,
CLASS_NAME VARCHAR NOT NULL,
MEETING_LINK VARCHAR NOT NULL,
YEAR INTEGER,
SECTION VARCHAR
"""

class_enrollment_schema = """
CLASS_ID INTEGER NOT NULL,
TEACHER_EMAIL VARCHAR,
STUDENT_EMAIL VARCHAR
"""

class_schedule_schema = """
CLASS_ID INTEGER NOT NULL,
DATE DATE,
START_TIME INTEGER,
END_TIME INTEGER
"""

assignments_schema = """
ASSIGNMENT_ID INTEGER PRIMARY KEY,
NAME VARCHAR NOT NULL,
DESCRIPTION VARCHAR NOT NULL,
ASSIGNED_DATE DATE NOT NULL,
DUE_DATE DATE NOT NULL,
CLASS_ID INTEGER NOT NULL
"""
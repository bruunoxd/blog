-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isTeacher" BOOLEAN NOT NULL,
    "isStudent" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "schoolMaterial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PersonSchoolMaterial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personid" INTEGER NOT NULL,
    "schoolMaterialid" INTEGER NOT NULL,
    CONSTRAINT "PersonSchoolMaterial_personid_fkey" FOREIGN KEY ("personid") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PersonSchoolMaterial_schoolMaterialid_fkey" FOREIGN KEY ("schoolMaterialid") REFERENCES "schoolMaterial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "personid" INTEGER,
    CONSTRAINT "Post_personid_fkey" FOREIGN KEY ("personid") REFERENCES "Person" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "postid" INTEGER,
    "personid" INTEGER,
    CONSTRAINT "Comment_postid_fkey" FOREIGN KEY ("postid") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_personid_fkey" FOREIGN KEY ("personid") REFERENCES "Person" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

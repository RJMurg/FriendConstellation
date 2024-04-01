-- CreateTable
CREATE TABLE "starboard" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) DEFAULT 'un-named',
    "stars" BIGINT NOT NULL DEFAULT 1,
    "assignedtask" INTEGER,
    "taskscompleted" INTEGER DEFAULT 0,

    CONSTRAINT "starboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100),
    "description" VARCHAR(500),
    "reward" BIGINT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "starboard" ADD CONSTRAINT "fk_currenttask" FOREIGN KEY ("assignedtask") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

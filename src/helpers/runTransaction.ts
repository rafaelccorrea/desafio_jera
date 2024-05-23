import { Connection, QueryRunner } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

type OperationFunction<T> = () => Promise<T>;

export async function runInTransaction<T>(
  operation: OperationFunction<T>,
  connection: Connection,
): Promise<T> {
  let queryRunner: QueryRunner;

  try {
    queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction();

    const result = await operation();

    await queryRunner.commitTransaction();

    return result;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    if (queryRunner) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    }

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `Erro durante a operação: ${error.message || 'Erro desconhecido.'}`,
      },
      HttpStatus.BAD_REQUEST,
    );
  } finally {
    if (queryRunner) {
      await queryRunner.release();
    }
  }
}

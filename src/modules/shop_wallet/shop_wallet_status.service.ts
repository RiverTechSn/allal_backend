import { Decimal } from '@prisma/client/runtime/library';
import { DatabaseService } from '../database/database.service';
import { Injectable } from '@nestjs/common';
import {} from '@prisma/client/sql';
@Injectable()
export class ShopWalletStatusSerice {
  constructor(private readonly _db: DatabaseService) {}
  async transaction({
    fromId,
    toId,
    amount,
  }: {
    fromId: number;
    amount: Decimal;
    toId: number;
  }) {
    let canProcess: Boolean = true;

    while (canProcess) {
      canProcess = false;
      try {
        // Start transaction

        await this._db.$executeRaw`START TRANSACTION;`;

        // Create a new wallet status for the sender
        await this._db.$executeRaw`
        INSERT INTO
    ShopWalletStatus (
        shopWalletBaseId,
        totalCredit,
        totalDebit,updatedAt
    ) (
        SELECT shopWalletBaseId, totalCredit + ${amount}, totalDebit, NOW()
        FROM ShopWalletStatus
        WHERE
            shopWalletBaseId = ${toId}
        ORDER BY id DESC
        LIMIT 1
    )
      `.then(console.log);

        // Create a new wallet status for the receiver
        const toRaw = await this._db.$executeRaw`
        INSERT INTO
    ShopWalletStatus (
        shopWalletBaseId,
        totalCredit,
        totalDebit, updatedAt
    ) (
        SELECT shopWalletBaseId, totalCredit , totalDebit+ ${amount}, NOW()
        FROM ShopWalletStatus
        WHERE
            shopWalletBaseId = ${fromId}
        ORDER BY id DESC
        LIMIT 1
    )
      `.then(console.log);

        // Commit transaction
        await this._db.$queryRaw`COMMIT;`;

        return { success: true, message: 'Transaction completed successfully' };
      } catch (error) {
        await this._db.$queryRaw`ROLLBACK;`;
        if (
          error.code === 'ER_LOCK_WAIT_TIMEOUT' ||
          error.code === 'ER_LOCK_DEADLOCK'
        ) {
          canProcess = true;
          throw new Error(
            'Transaction failed due to a row lock. Please try again.',
          );
        }
      }
    }
  }
}

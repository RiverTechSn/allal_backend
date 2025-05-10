INSERT INTO
    ShopWalletStatus (
        shopWalletBaseId,
        totalCredit,
        totalDebit
    ) (
        SELECT
            shopWalletBaseId,
            totalCredit,
            totalDebit + ?
        FROM ShopWalletStatus
        WHERE
            shopWalletBaseId = ?
        ORDER BY id DESC
        LIMIT 1
    )
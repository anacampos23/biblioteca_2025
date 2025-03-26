<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MigratePulseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate-pulse';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run fresh migrations for the pulse database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Running pulse database migrations...');
        
        $this->call('migrate:fresh', [
            '--database' => 'pulse',
            '--path' => 'database/migrations/pulse'
        ]);

        $this->info('Pulse database migrations completed successfully!');
    }
}

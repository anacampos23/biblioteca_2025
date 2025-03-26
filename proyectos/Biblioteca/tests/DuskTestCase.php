<?php

namespace Tests;

use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Laravel\Dusk\TestCase as BaseTestCase;
use PHPUnit\Framework\Attributes\BeforeClass;

abstract class DuskTestCase extends BaseTestCase
{
    /**
     * The base URL for all tests.
     *
     * @var string
     */
    protected static $baseUrl = 'http://biblioteca.test';

    /**
     * Prepare for Dusk test execution.
     */
    #[BeforeClass]
    public static function prepare(): void
    {

    }

    /**
     * Create the RemoteWebDriver instance.
     */
    protected function driver(): RemoteWebDriver
    {
        $options = (new ChromeOptions)->addArguments([
            '--disable-gpu',
            '--headless=new',
            '--window-size=1920,1080',
            '--no-sandbox',
            '--disable-dev-shm-usage',
        ]);

        return RemoteWebDriver::create(
            'http://selenium:4444/wd/hub',
            DesiredCapabilities::chrome()->setCapability(
                ChromeOptions::CAPABILITY,
                $options
            )
        );
    }


    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();

        // Ejecutar migrate:fresh --seed antes de iniciar los tests
        $command = 'php artisan migrate:fresh --seed';
        exec($command, $output, $returnCode);

        if ($returnCode !== 0) {
            throw new \RuntimeException('Error al ejecutar migrate:fresh --seed inicial: ' . implode("\n", $output));
        }
    }

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();

        // Ejecutar migrate:fresh --seed después de todos los tests
        $command = 'php artisan migrate:fresh --seed';
        exec($command, $output, $returnCode);

        if ($returnCode !== 0) {
            throw new \RuntimeException('Error al ejecutar migrate:fresh --seed: ' . implode("\n", $output));
        }
    }
}
